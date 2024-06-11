"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Note {
  title: string;
  body: string;
}

export default function AddNoteModal({ getAllNotes }: { getAllNotes: () => Promise<void> }) {
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [isAlert, setIsAlert] = useState({ state: false, message: "" });
  const [isPublishing, setIsPublishing] = useState(false);
  const { user } = useUser();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (user) {
      const localNotes = localStorage.getItem("notes");
      if (localNotes) {
        const parsedNotes = JSON.parse(localNotes);
        const newNotes = [...parsedNotes, { title: titleText, body: bodyText }];
        localStorage.setItem("notes", JSON.stringify(newNotes));
        if (!bodyText)
          setIsAlert({
            state: true,
            message: "Publishing an empty note? I think note!",
          });
        try {
          const response = await fetch(`/api/note`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author: user.name, title: titleText, body: bodyText }),
          });
          const newNote = await response.json();
          console.log(newNote, "ll");
        } catch (error) {
          console.error(error);
        }
        setTitleText("");
        setBodyText("");
        getAllNotes();
      }
    } else
      setIsAlert({
        state: true,
        message: "Please login or signup first in order to publish a note. :&gt;",
      });
  }

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Plus
            size={60}
            className="fixed bottom-20 transform -translate-x-1/2 rounded-full bg-[#E75B38] p-2 cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Note</DialogTitle>
            <Input
              value={titleText}
              onChange={(e) => e.target.value != " " && setTitleText(e.target.value)}
              placeholder="Title"
            />
          </DialogHeader>
          <Textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            placeholder="Type your message here..."
          />
          <div className="flex  justify-between gap-24">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <form onSubmit={handleSubmit}>
              <DialogClose asChild>
                <Button type="submit">Publish</Button>
              </DialogClose>
            </form>
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isAlert.state}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dear Anon!</AlertDialogTitle>
            <AlertDialogDescription>{isAlert.message}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsAlert({ state: false, message: "" })}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
