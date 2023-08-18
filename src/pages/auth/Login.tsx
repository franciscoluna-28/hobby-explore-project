import AuthCarousel from "../../components/auth/AuthCarousel";
import LoginForm from "../../components/auth/LoginForm";
import Dog from "../../assets/dog.jpg";


// Main app route page '/' to handle Signup logic with Firebase
// Besides the auth form this includes a small carousel of quotes as a detail
export default function Login() {
  return (
    <main className="">
      <section className="flex flex-row-reverse overflow-hidden">
        <div className="flex flex-col w-full p-8">
          <div className="flex flex-col m-auto min-w-full xl:max-w-7xl gap-2">
            <h1 className="text-center text-4xl leading-tight font-semibold text-accent">
              Welcome Back!
            </h1>

            <span className="block text-center text-accent text-sm">
              Hobby Explore | Discover, Share and Connect
            </span>
            <LoginForm />
          </div>
        </div>
        <AuthCarousel image={Dog} />
      </section>
    </main>
  );
}
