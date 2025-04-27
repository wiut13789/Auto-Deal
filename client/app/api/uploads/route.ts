import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

const writeFile = promisify(fs.writeFile);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File; // <<< здесь

    if (!file) {
      return NextResponse.json({ error: "Нет файла" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer(); // <<< теперь без ошибок
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileName = `${uuidv4()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer);

    const publicPath = `/uploads/${fileName}`;

    return NextResponse.json({ filePath: publicPath }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
