import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const dataResponse = await fetch(`${process.env.BASE_URL}/data/cars.json`);

    const data = await dataResponse.json();

    return NextResponse.json(
      { data: data.slice(0, 10), message: "SUCCESS" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "ERROR", error }, { status: 500 });
  }
};
