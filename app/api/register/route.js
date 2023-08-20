import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req) {
    try {
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword });

        return NextResponse.json({ message: "User Registered" }, { status: "201" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "An error occured while registering user: ", error}, { status: "500" });
    }
}