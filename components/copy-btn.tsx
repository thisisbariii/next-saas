"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Clipboard } from "lucide-react";
const CopyBtn = ({ text }: { text: string }) => {
    const CopyToClipboard = (text:string)=>{
        navigator.clipboard.writeText(text).then(()=>{
            alert("copy to clipboard")
        })
    }
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button onClick={()=>CopyToClipboard(text)} className="text-slate-50 absolute right-0 p-2 top-0 ">
            <Clipboard />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy Code</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default CopyBtn;
