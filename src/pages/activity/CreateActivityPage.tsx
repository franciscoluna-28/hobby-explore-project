import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import ImagePlaceholder from "../../assets/imagePlaceholder.png";
/* import { AspectRatio } from "../../components/ui/aspect-ratio"; */
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Button } from "../../components/ui/button";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateActivity() {
  const formSchema = z.object({
    name: z
      .string()
      .min(10, {
        message: "Activity name must be at least 10 characters.",
      })
      .max(65, {
        message: "Activity name should be at most 65 characters.",
      }),
    url: z
      .string()
      .url({
        message: "Please enter a valid URL.",
      })
      .max(255, {
        message: "URL is too long. A maximum of 255 characters is allowed.",
      }),
    description: z.string().min(40, {
      message: "Description must be at least 40 characters.",
    }),
    participants: z.coerce
      .number()
      .min(1, {
        message: "You need at least one participant in this activity!",
      })
      .max(100, {
        message: "A maximum of 100 participants is allowed.",
      }),
    accessibility: z.coerce
      .number()
      .min(0, {
        message: "Choose a valid option!",
      })
      .max(1),
    category: z.string().min(1, {
      message: "Please select a valid type.",
    }),
  });

  const [imageUrl, setImageUrl] = useState<string>(ImagePlaceholder);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  /*   const [activityName, setActivityName] = useState("");
  const [imageUrl, setImageUrl] = useState(""); */
  const [description, setDescription] = useState("");
  /*   const [fruit, setFruit] = useState("");
  const [participants, setParticipants] = useState("");
  const [accessibility, setAccessibility] = useState("");
  const [cost, setCost] = useState("");
 */
  /*   const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };
 */

  return (
    <section className="w-full">
      <h1 className="text-4xl font-bold">Create Activity</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Do a Minecraft Speedrun" {...field} />
                </FormControl>
                <FormDescription>The name of your activity.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://images.unsplash.com/photo-1682685796766-0fddd3e480de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    {...field}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </FormControl>
                <FormDescription>A valid Image URL.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    className="h-fit overflow-hidden"
                    placeholder="Explain us what your activity is about! We love to hear your thoughts."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  A description of your activity. You can explain details,
                  benefits and more here.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="">
            <Label className="">Image Preview</Label>
            <img className="h-72 mt-4 rounded-xl" src={imageUrl}></img>
          </div>
          <FormField
            control={form.control}
            name="participants"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Participants</FormLabel>
                <FormControl>
                  <Input
                    className="w-min !appearance-none"
                    {...field}
                    type="number"
                    placeholder="1"
                  />
                </FormControl>
                <FormDescription>
                  The amount of participants within your activity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accessibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Accessibility</FormLabel>{" "}
                {/* Corregir la etiqueta */}
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="How accessible is your activity?" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">Free</SelectItem>
                    <SelectItem value="0.25">Cheap (10 - 50$)</SelectItem>
                    <SelectItem value="0.50">
                      Not so Expensive (50$ - 500$)
                    </SelectItem>
                    <SelectItem value="0.75">
                      Expensive (500$ - 2000$)
                    </SelectItem>
                    <SelectItem value="1.00">
                      Really expensive (2000$+)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the accessibility of your activity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel> {/* Cambiar la etiqueta */}
                <Select {...field}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        className="!text-left"
                        placeholder="Select category"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="recreational">Recreational</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="diy">DIY</SelectItem>
                    <SelectItem value="charity">Charity</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                    <SelectItem value="relaxation">Relaxation</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="busywork">Busywork</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  The category you consider fit the most your activity.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </section>

    /*     <div className="max-w-4xl w-full m-auto">
      <div className="gap-2 flex items-center w-full m-auto">
        <h1 className="text-4xl font-bold">Create Activity</h1>
      </div>

      <section className="flex flex-col space-y-4 mt-4 w-full">
        <div className="flex gap-2 items-center">
          <AiOutlineInfoCircle className="order-2" />
          <Label htmlFor="name">Name</Label>
        </div>
        <Input type="name" placeholder="The name of your activity" />

        <div className="flex gap-2 items-center">
          <AiOutlineInfoCircle className="order-2" />
          <Label htmlFor="name">Image URL</Label>
        </div>
        <Input type="name" placeholder="The URL of your image" />
        <div className="">
          <Label htmlFor="name">Preview your image here</Label>
          <img className="w-96 mt-4 rounded-xl" src={ImagePlaceholder} />
        </div>

        <div className="flex gap-2 items-center">
          <AiOutlineInfoCircle className="order-2" />
          <Label htmlFor="name">Description</Label>
        </div>
        <Textarea
          id="description"
          placeholder="The description of your activity. You can provide details about it and tell other users how it works."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <Label htmlFor="participants">Participants</Label>
          <AiOutlineInfoCircle className="order-2" />
        </div>
        <Input
          type="participants"
          className="w-[200px]"
          placeholder="Number of participants"
        />

        <section className="flex gap-4">
          <div>
            <Label htmlFor="name">Category</Label>
            <AiOutlineInfoCircle className="order-2 inline ml-2" />
            <Select>
              <SelectTrigger className="w-[180px] mt-2">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">Accesibility</Label>
            <AiOutlineInfoCircle className="order-2 inline ml-2" />
            <Select>
              <SelectTrigger className="w-[180px] mt-2">
                <SelectValue placeholder="Select accesibility" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="name">Cost</Label>
            <AiOutlineInfoCircle className="order-2 inline ml-2" />
            <Select>
              <SelectTrigger className="w-[180px] mt-2">
                <SelectValue placeholder="Select the cost" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </section>
        <div className="mt-2">
        <Button className="bg-accent w-min mt-4">Submit</Button>
        </div>
      </section>
    </div> */
  );
}
