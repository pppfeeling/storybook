import DataTable from "./data-grid-sub";
import DATA from "./data";
import { Task, columns } from "./columns";
import { makeData, TaskSub } from "./data";
import React from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "./lib/utils";

import { ComboboxInput } from "@/components/ui/comboboxInput";

function App() {
  return <ComboboxInput />;
}

/*
function App() {
  const [data, setData] = React.useState(() => makeData(100));

  return (
    <>
    
      <DataTable DATA={data} columns={columns as any} />
    
    </>
  );
}
*/

export default App;
