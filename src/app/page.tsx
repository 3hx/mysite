import { BsDiscord, BsGithub } from "react-icons/bs";
export default function Home() {
  return (
    <main className="flex items-center justify-center selection:bg-green-300 min-h-screen p-4 bg-gray-50">
      <div className="border p-4 border-gray-300 w-full max-w-xl rounded-md">
        <div className="flex items-center  justify-between">
          <>
            <p className="text-gray-900 font-bold text-xl">
              3hx
              <span className="tracking-wide uppercase font-light text-gray-800">
                : Developer
              </span>
            </p>
          </>
          <div className="flex text-xl text-gray-500 gap-x-3 ">
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://discordapp.com/users/896666282076807189"
            >
              <BsDiscord className="hover:text-green-500" />
            </a>
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-green-500 duration-100 ease-in-out"
              href="https://github.com/3hx"
            >
              <BsGithub className="" />
            </a>
          </div>
        </div>

        <div className="mt-6 space-y-3 font-light">
          <p className="text-gray-800">
            <span className="text-gray-500">Languages: </span>Typescript,
            Python, Rust
          </p>

          <p className="text-gray-800">
            <span className="text-gray-500">Frameworks: </span>
            nextjs, reactjs, react native, svelte
          </p>
        </div>
      </div>
    </main>
  );
}
