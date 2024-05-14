"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function RegisterModal() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="register_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Login</h3>
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="Username"
          />
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <p className="py-4">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={() => {
                const loginModal = document.getElementById("login_modal");
                const registerModal = document.getElementById("register_model");
                if (
                  loginModal instanceof HTMLDialogElement &&
                  registerModal instanceof HTMLDialogElement
                ) {
                  loginModal.showModal();
                  registerModal.close();
                }
              }}
            >
              Login here
            </Button>
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
