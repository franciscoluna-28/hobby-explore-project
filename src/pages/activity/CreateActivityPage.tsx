import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import ImagePlaceholder from "../../assets/imagePlaceholder.png";
/* import { AspectRatio } from "../../components/ui/aspect-ratio"; */
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
import { useAddCustomActivity } from "../../features/custom-activities/api/use-create-custom-activity";
import { useAuth } from "../../hooks/useAuth";
import { BoredAPIActivityType } from "../../types/default-activities";

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
    accessibility: z.coerce.number().min(0, {
      message: "Choose a valid option!",
    }),
    cost: z.coerce
      .number()
      .min(0, {
        message: "Choose a valid option!",
      })
      .max(1),
    category: z.string().min(1, {
      message: "Please select a valid type.",
    }),
  });


  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  

  const addCustomActivityMutation = useAddCustomActivity();
  const { currentUser } = useAuth();

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Create a custom activity object based on form values
    const customActivityData = {
      userUID: currentUser?.uid!, // Use empty string as fallback
      userPictureURL: currentUser?.photoURL || "", // Use empty string as fallback
      name: values.name,
      imageURL: values.url,
      type: values.category as BoredAPIActivityType,
      price: values.cost, // Parse the cost to a number
      participants: values.participants, // Parse participants to a number
      description: values.description,
      accessibility: values.accessibility, // Parse accessibility to a number
    };

    // Call the mutation to add the custom activity
    addCustomActivityMutation.mutate(customActivityData);
  }

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
                  />
                </FormControl>
                <FormDescription>A valid Image URL.</FormDescription>
                <FormMessage />
                <div className="">
            <Label className="">Image Preview</Label>
            <img className="h-72 mt-4 rounded-xl" src={field.value || ImagePlaceholder}></img>
          </div>
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
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>{" "}
                {/* Corregir la etiqueta */}
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="How expensive is your activity?" />
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
Select the cost of your activity.
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
                    <SelectItem value="0">Not accesible</SelectItem>
                    <SelectItem value="0.25">Not so accesible</SelectItem>
                    <SelectItem value="0.50">
                    Kind of accesible
                    </SelectItem>
                    <SelectItem value="0.75">
                      Really Accesible
                    </SelectItem>
                    <SelectItem value="1.00">
Everyone can do it
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
                <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
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

          <Button disabled={addCustomActivityMutation.isSuccess} type="submit">Submit</Button>
          {addCustomActivityMutation.isSuccess ? <span className="text-green-500 block">
            Activity Submited Successfully!</span> : null}
        </form>
      </Form>
    </section>
  );
}
