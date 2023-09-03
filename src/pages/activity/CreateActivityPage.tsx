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

export default function CreateActivity() {
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
    <div className="max-w-4xl w-full m-auto">
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
    </div>
  );
}
