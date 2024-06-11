import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const allNotes = await prisma.note.findMany({
      where: { isreply: false },
      include: {
        replies: true,
      },
    });
    return NextResponse.json({ allNotes }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch all notes." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { author, title, body, isReply, parentId } = await request.json();
    const newNote = await prisma.note.create({
      data: {
        author: author,
        title: title,
        body: body,
        isreply: isReply,
        parentId: parentId,
      },
    });
    return NextResponse.json({ newNote }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to publish note" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const { noteId, title, body } = await request.json();
    const note = await prisma.note.update({
      where: {
        id: noteId,
      },
      data: {
        title: title,
        body: body,
      },
    });
    console.log("lop");
    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update note" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { noteId } = await request.json();
    await prisma.note.delete({
      where: { id: noteId },
    });
    return NextResponse.json({ success: "Deleted note successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 });
  }
}
