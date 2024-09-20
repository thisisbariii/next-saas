import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { Plus } from "lucide-react";
import { createProject } from "@/actions/createProject";
import SubmitButton from "./submit-proj-btn";

const NewProjBtn = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Plus className="w-4 h-4 " />
          
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white p-6 shadow-lg sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started with your ideas.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" action={createProject}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="name">Name</Label>
              <Input name="name" id="name" placeholder="Project Name" />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="url">URL</Label>
              <Input name="url" id="url" placeholder="https://example.com" />
            </div>
          </div>
          <div className="flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Project Description (optional)"
            />
          </div>
       <SubmitButton/>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjBtn;
