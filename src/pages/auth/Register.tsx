import AuthCarousel from "../../components/auth/AuthCarousel";
import SignUpForm from "../../components/auth/RegisterForm";
import Dog from "../../assets/dog.jpg";
import Logo from "../../assets/logo.png"

// Main app route page '/' to handle Signup logic with Firebase
// Besides the auth form this includes a small carousel of quotes as a detail
export default function Register() {
  return (
    <main className="">
      <section className="flex flex-row-reverse overflow-hidden">
        <div className="flex flex-col w-full p-8">
          <div className="flex flex-col m-auto min-w-full xl:max-w-7xl gap-2">
          <img className="w-36 m-auto h-20" src={Logo}></img>
            <h1 className="text-center text-4xl leading-tight font-semibold text-accent">
              Welcome!
            </h1>

            <span className="block text-center text-accent text-sm">
              Hobby Explore | Discover, Share and Connect
            </span>
            <SignUpForm />
          </div>
        </div>
        <AuthCarousel image={Dog} />
      </section>
    </main>
  );
}
