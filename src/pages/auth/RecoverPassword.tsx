import RecoverPasswordForm from "../../components/auth/RecoverPasswordForm"

export default function RecoverPassword() {
    return(
        <main className="">
        <section className="flex flex-row-reverse overflow-hidden">
          <div className="flex flex-col w-full p-8">
            <div className="flex flex-col m-auto min-w-full xl:max-w-7xl gap-2">
              <h1 className="text-center text-4xl leading-tight font-semibold text-accent">
                Recover your Password
              </h1>
  
              <span className="block text-center text-accent text-sm">
                The instructions will be done once you've filled your email
              </span>
<RecoverPasswordForm/>
            </div>
          </div>
        </section>
      </main>
    )
}