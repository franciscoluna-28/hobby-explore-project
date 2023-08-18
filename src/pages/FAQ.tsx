import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

export default function FAQ() {
  return (
    <main className="w-full max-w-3xl m-auto">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      <Accordion type="single" collapsible className="w-full mt-4">
        <AccordionItem value="item-1">
          <AccordionTrigger className="font-normal">What is Hobby Explore?</AccordionTrigger>
          <AccordionContent>
            Hobby Explore is an application I've created to help you discover
            cool hobbies and activities. Powered by BoredAPI and the awesome
            pictures from Unsplash, you'll find new adventures and ideas here!
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="font-normal">Why did I create Hobby Explore?</AccordionTrigger>
          <AccordionContent>
            I made this app because I want you to find cool stuff to do and
            connect with friendly people who share your interests. It's like a
            cozy haven where you can uncover hobbies you never even knew existed
            and make friends who are just as passionate about them. Moreover, I
            wanted to stretch my skills and explore fullstack development. You
            might know me as a frontend developer, but I achieved my dream of making my own
            backend with this project too.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="font-normal">
            {" "}
            Why don't some images match the activity name?
          </AccordionTrigger>
          <AccordionContent>
            This happens because of the way Hobby Explore's API works. While I
            strive for precision, the results may sometimes be 'different' due
            to the creative process of the backend. And I believe imperfection
            is important to keep things interesting and fun!
          </AccordionContent>
        </AccordionItem >
        <AccordionItem value="item-4">
          <AccordionTrigger className="font-normal">
            {" "}
            How did the idea start?
          </AccordionTrigger>
          <AccordionContent>
          Hobby Explore originated as a simple API to fetch images from Unsplash and activities from BoredAPI. It grew into a polished project by merging components from WIP projects and exploring backend development, all thanks to the encouragement of all of you! I really hope you're enjoying this application.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
