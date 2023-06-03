import formidable from "formidable";
import { NextApiRequest } from "next";
import mime from "mime";
import { join } from "path";
import fs from "fs";

export const FormidableError = formidable.errors.FormidableError;

export const parseForm = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  return new Promise(async (resolve, reject) => {
    const uploadDir = join(
      process.env.ROOT_DIR || process.cwd(),
      `public/uploads/images`
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdir(uploadDir, {recursive: true}, (err) => {
        console.log(err)
        reject(err)
        return
      })
    }

    const form = formidable({
      maxFiles: 4,
      maxFileSize: 4000 * 1024 * 1024,
      uploadDir,
      multiples: true,
      filename: (_name, _ext, part) => {
        const uniqueSufix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${
          part.name || "unknow"
        }-${uniqueSufix}.${mime.getExtension(
          part.mimetype || ""
        ) || "unknown"}`;
        return filename;
      },
      filter: (part) => {
        return (
          part.name === "images" && (part.mimetype?.includes("image") || false)
        );
      },
    });
  
    form.parse(req, function (err, fields, files) {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};
