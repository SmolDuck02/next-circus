"use client";
import AddNoteModal from "@/components/modals/add-note-modal";
import Club from "@/components/notes/club";
import Diamond from "@/components/notes/diamond";
import Heart from "@/components/notes/heart";
import Spade from "@/components/notes/spade";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { comic } from "@/styles/fonts";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";

interface Note {
  id: number;
  author: string;
  title: string;
  body: string;
  isReply: boolean;
  replies: Note[];
  timestamp: Date;
}
export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);

  async function getAllNotes() {
    try {
      const response = await fetch(`/api/note`);
      const allNotes = await response.json();
      setNotes(allNotes.allNotes.sort((a: Note, b: Note) => a.id - b.id));

      console.log(allNotes, "oo");
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => console.log(notes), [notes]);

  useEffect(() => {
    getAllNotes();
    // const localNotes = localStorage.getItem("notes");
    // if (localNotes) setNotes(JSON.parse(localNotes));
    // console.log(localNotes);
    // const timer = setInterval(() => {
    // }, 1000);
    // return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative bottom-10 flex flex-col w-full items-center">
        <div className="fixed top-[15%] w-[60rem] h-screen ">
          <Heart className="h-16 fixed top-[9rem] left-[26rem]" />
          <Spade className="h-16 fixed top-[20rem] left-[9rem]" />
          <Club className="h-16 fixed top-[5rem] right-[26rem]" />
          <Diamond className="h-16 fixed top-[16rem] right-[9rem]" />
          <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-[16rem_16rem_16rem_16rem] grid-rows-[1fr] gap-3">
            <div className="flex flex-col gap-3 ">
              <div id="hidden" className="h-32"></div>
              <Note divClassname="bg-[#31B28B]" note={notes[0]}>
                n
              </Note>
              <Note>o</Note>
            </div>
            <div className=" flex flex-col gap-3 ">
              <Note>o</Note>
              <Note divClassname="bg-[#5456B8]" note={notes[1]}>
                n
              </Note>
            </div>
            <div className="  flex flex-col gap-3">
              <Note divClassname="bg-[#2A9D8F] h-48">t</Note>
              <Note divClassname=" h-48" note={notes[2]}>
                s
              </Note>
            </div>
            <div className=" flex flex-col gap-3">
              <div id="hidden" className="h-16"></div>
              <Note divClassname="bg-[#1282BD]">e</Note>
              <Note>!?</Note>
            </div>
          </div>
        </div>

        <AddNoteModal getAllNotes={getAllNotes} />
      </div>
    </>
  );
}

function Note({
  children,
  note,
  divClassname,
}: {
  children?: React.ReactNode;
  note?: Note | null;
  divClassname?: string;
}) {
  const { user } = useUser();
  const [isAlert, setIsAlert] = useState(false);
  const [isDialog, setIsDialog] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | undefined>();
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    if (note) {
      setCurrentNote(note);
      setTitleText(note.title);
      setBodyText(note.body);
    }
  }, [note]);

  async function handeUpdate() {
    if (isDialog && note) {
      try {
        const response = await fetch(`/api/note`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ noteId: note.id, title: titleText, body: bodyText }),
        });
        const newNote = await response.json();
        console.log(newNote, "ll");
      } catch (error) {
        console.error(error);
      }
    }
    setIsDialog(!isDialog);
    setIsReply(false);
  }

  async function handleDelete() {
    if (note) {
      try {
        const response = await fetch("/api/note", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ noteId: note.id }),
        });
        const deletedNote = await response.json();
        console.log(deletedNote, "ll");
      } catch (error) {
        console.error(error);
      }
      setCurrentNote(undefined);
    }
  }

  async function createNote() {
    if (user && currentNote) {
      try {
        const response = await fetch(`/api/note`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            author: user.name,
            title: null,
            body: replyText,
            isReply: true,
            parentId: currentNote.id,
          }),
        });
        const replyNote = await response.json();
        console.log(replyNote.newNote, "rr");
        return replyNote.newNote;
      } catch (error) {
        console.error(error);
      }
      setReplyText("");
      return null;
    }
  }

  async function handleAddReply() {
    setIsReply(false);
    if (user) {
      const replyNote = await createNote();
      if (currentNote) {
        const newCurrentNote = { ...currentNote, replies: [...currentNote.replies, replyNote] };
        setCurrentNote(newCurrentNote);
      }
    } else setIsAlert(true);
    setReplyText("");
  }

  return (
    <>
      <AlertDialog open={isAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dear Anon!</AlertDialogTitle>
            <AlertDialogDescription>
              Please donate to this number to avail our services: 09151m155h3r
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsAlert(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {currentNote ? (
        <Dialog onOpenChange={handeUpdate}>
          <DialogTrigger>
            <div
              className={cn(
                "relative h-60 bg-[#086F78] rounded-lg p-5 cursor-pointer ",
                divClassname
              )}
            >
              <div className="flex mb-3">{titleText}</div>
              <div className="flex text-opacity-50 text-sm break-all text-start justify-start">
                {bodyText}
              </div>
              <div className="flex absolute bottom-3 left-0 px-5  w-full justify-between text-xs text-opacity-20">
                <span>By {currentNote.author}</span>
                <span>
                  {new Date(currentNote.timestamp).toLocaleString("en-UK", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
                </span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
            {showReplies && (
              <>
                {/* even */}
                <Reply
                  replies={currentNote.replies.filter((startup, index) => index % 2 == 0)}
                  position="left"
                />
                {/* odd */}
                <Reply
                  replies={currentNote.replies.filter((startup, index) => index % 2 != 0)}
                  position="right"
                />
              </>
            )}
            <DialogHeader>
              <DialogTitle>Note</DialogTitle>
              <Input
                disabled={currentNote.author != user?.name}
                value={titleText}
                onChange={(e) => e.target.value != " " && setTitleText(e.target.value)}
                placeholder="Title"
              />
            </DialogHeader>
            <div className="w-full min-h-80 flex flex-col">
              <Textarea
                disabled={currentNote.author != user?.name}
                placeholder={bodyText}
                value={bodyText}
                className="mb-3 flex-1 flex flex-col"
                onChange={(e) => setBodyText(e.target.value)}
              ></Textarea>
              <div className="flex justify-between text-xs">
                <div className="flex gap-3">
                  <DialogDescription className=" cursor-pointer" onClick={() => setIsReply(true)}>
                    Add Reply
                  </DialogDescription>
                  <DialogDescription
                    className=" cursor-pointer"
                    onClick={() => setShowReplies(!showReplies)}
                  >
                    {!showReplies ? "Show Replies" : "Hide Replies"} ({currentNote.replies.length})
                  </DialogDescription>
                </div>
                {currentNote.author == user?.name && (
                  <DialogDescription>*automatically saves</DialogDescription>
                )}
              </div>
            </div>
            <DialogFooter>
              {isReply ? (
                <div className="flex flex-col items-end w-full  gap-2 justify-between">
                  <Input
                    value={replyText}
                    onChange={(e) => e.target.value != " " && setReplyText(e.target.value)}
                    placeholder="Reply message here..."
                  />
                  <div className="flex gap-3">
                    <Button variant={"secondary"} onClick={() => setIsReply(false)}>
                      Cancel
                    </Button>
                    <Button disabled={!replyText} onClick={handleAddReply}>
                      Publish
                    </Button>
                  </div>
                </div>
              ) : (
                currentNote.author == user?.name && (
                  <DialogClose asChild>
                    <Button variant="destructive" onClick={handleDelete}>
                      Delete
                    </Button>
                  </DialogClose>
                )
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div className={cn("h-60 bg-[#086F78] rounded-lg flex items-center pl-16", divClassname)}>
          <p
            className={`transform -rotate-45 text-[10rem] ${comic.className} opacity-80 select-none`}
          >
            {children}
          </p>
        </div>
      )}
    </>
  );
}

function Reply({ replies, position }: { replies: Note[]; position: string }) {
  return (
    <div
      className={` h-[32rem] w-80 fixed flex flex-col justify-center items-${
        position == "left" ? "end" : "start"
      }  gap-3  -${position}-[21rem] `}
    >
      {replies.map((reply, index) => (
        <div key={index} className="flex">
          <DialogDescription className="animate-pop break-all  bg-white p-3 rounded">
            {reply.body}
          </DialogDescription>
        </div>
      ))}
    </div>
  );
}
