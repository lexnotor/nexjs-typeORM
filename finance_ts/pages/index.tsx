import { MutableRefObject, useRef, useState } from "react";
import type { UserType, PhotoType } from "..";

export default function Home() {
  const ref: MutableRefObject<UserType> = useRef({
    email: "",
    names: "",
    age: 0,
  });

  const photoRef: MutableRefObject<PhotoType> = useRef({} as PhotoType);
  const [users, setUsers] = useState<UserType[]>([]);

  const getUsers = async () => {
    try {
      const res = await fetch("/api/user").then((res) => res.json());
      console.log(res.data);

      setUsers(res.data);
    } catch (er) {
      console.log(er);
    }
  };

  const saveHandle = async () => {
    if (!ref.current.email || !ref.current.names || !ref.current.age) return;
    const data = { ...ref.current };
    try {
      await fetch("/api/user", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getUsers();
    } catch (er) {
      console.log(er);
    }
  };

  const savePhotoHandle = async () => {
    if (!photoRef.current.title) return;
    const data = { ...photoRef.current };
    try {
      await fetch("/api/photo", {
        body: JSON.stringify(data),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getUsers();
    } catch (er) {
      console.log(er);
    }
  };

  return (
    <main className="">
      <section>
        <h2>Ajouter element</h2>
        <form>
          <div className="flex flex-col gap-2 p-5">
            <label htmlFor="names">Noms</label>
            <input
              id="names"
              className="py-1 px-4 border-0 bg-slate-100 text-slate-800 w-[300px]"
              type="text"
              onChange={(e) => (ref.current.names = e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 p-5">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="py-1 px-4 border-0 bg-slate-100 text-slate-800 w-[300px]"
              type="text"
              onChange={(e) => (ref.current.email = e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 p-5">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              className="py-1 px-4 border-0 bg-slate-100 text-slate-800 w-[300px]"
              type="number"
              onChange={(e) =>
                (ref.current.age = parseInt(e.target.value || "0"))
              }
            />
          </div>
          <div className="p-5">
            <button
              className="block w-[300px] text-center p-1 test-sm bg-neutral-600"
              onClick={saveHandle}
              type="button"
            >
              Save
            </button>
          </div>
        </form>
        <h2>Ajouter photo</h2>
        <form>
          <div className="flex flex-col gap-2 p-5">
            <label htmlFor="age">Title</label>
            <input
              id="title"
              className="py-1 px-4 border-0 bg-slate-100 text-slate-800 w-[300px]"
              type="text"
              onChange={(e) => (photoRef.current.title = e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 p-5">
            <label htmlFor="age">Id</label>
            <input
              id="photoId"
              className="py-1 px-4 border-0 bg-slate-100 text-slate-800 w-[300px]"
              type="text"
              onChange={(e) => (photoRef.current.id = e.target.value)}
            />
          </div>
          <div className="p-5">
            <button
              className="block w-[300px] text-center p-1 test-sm bg-neutral-600"
              onClick={savePhotoHandle}
              type="button"
            >
              Save
            </button>
          </div>
        </form>
      </section>
      <section>
        <h2>Liste elements</h2>
        <table className="border">
          <tbody>
            {users.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-5">{item.names}</td>
                <td className="py-2 px-5">{item.email}</td>
                <td className="py-2 px-5">{item.age}</td>
                <td className="py-2 px-5">{item.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
