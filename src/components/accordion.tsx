"use client";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { type Dispatch, type SetStateAction, createContext, forwardRef, useContext, useState, createRef, useEffect } from "react";
import { cn } from "~/lib/utils";

const AccordionTypeContext = createContext<AccordionType>("single");
const OpenContext = createContext<[string, Dispatch<SetStateAction<string>>]>(["", () => ""]);
export type AccordionType = "single" | "multiple";
const Accordion = forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement> & {
  type: AccordionType,
}>(function({ className, type, children, ...props }, ref) {
  const valueState = useState<string>("");
  if (type === "single") {
    return (
      <ul ref={ref} className={cn("flex flex-col flex-wrap w-full", className)} {...props}>
        <AccordionTypeContext.Provider value={type}>
          <OpenContext.Provider value={valueState}>
            {children}
          </OpenContext.Provider>
        </AccordionTypeContext.Provider>
      </ul>
    );
  };
  return (
    <ul ref={ref} className={cn("flex flex-col flex-wrap w-full", className)} {...props}>
      <AccordionTypeContext.Provider value={type}>
        {children}
      </AccordionTypeContext.Provider>
    </ul>
  );
});
Accordion.displayName = "Accordion";

const values = new Set<string>();
const ValueContext = createContext<string>("");
const AccordionItem = forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement> & {
  value: string,
}>(function({ className, children, value, ...props }, ref) {
  const type = useContext(AccordionTypeContext);
  if (values.has(value)) {
    console.warn("AccordionItem value must be unique");
  };
  values.add(value);
  const valueState = useState<string>("");
  if (type === "multiple") {
    return (
      <li ref={ref} className={cn("flex flex-col flex-wrap gap-2", className)} {...props}>
        <ValueContext.Provider value={value}>
          <OpenContext.Provider value={valueState}>
            {children}
          </OpenContext.Provider>
        </ValueContext.Provider>
      </li>
    );
  };
  return (
    <li ref={ref} className={cn("flex flex-col flex-wrap gap-2", className)} {...props}>
      <ValueContext.Provider value={value}>
        {children}
      </ValueContext.Provider>
    </li>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(function({ className, children, onClick, ...props }, ref) {
  const [open, setOpen] = useContext(OpenContext);
  const value = useContext(ValueContext);
  return (
    <button ref={ref} className={cn("p-4 flex items-center gap-2", className)} onClick={function(e) {
      if (value === open) {
        setOpen("");
      } else {
        setOpen(value);
      };
      if (onClick) {
        onClick(e);
      };
    }} {...props}>
      {children}
      <ChevronDownIcon role="presentation" className={cn("w-4 h-auto fill-slate-900/70 transition-transform duration-300", open === value && "rotate-180")} />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";
const AccordionContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(function({ className, ...props }, ref) {
  const accordionType = useContext(AccordionTypeContext);
  const [open] = useContext(OpenContext);
  const value = useContext(ValueContext);

  const outerDivRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const outerDiv = outerDivRef.current;
    if (outerDiv && outerDiv.children.length > 0) {
      const divStyles = getComputedStyle(outerDiv);
      if (divStyles.getPropertyValue("--mh") === "") {
        const clonedDiv = outerDiv.cloneNode(true) as HTMLElement;
        for (let i = 0; i < outerDiv.attributes.length; i++) {
          const attribute = outerDiv.attributes.item(i)!;
          clonedDiv.setAttribute(attribute.name, attribute.value);
        };
        clonedDiv.classList.remove("transition-[max-height,opacity]", "max-h-0");
        setTimeout(function() {
          outerDiv.parentElement!.appendChild(clonedDiv);
          outerDiv.style.setProperty("--mh", clonedDiv.clientHeight.toString() + "px");
          clonedDiv.remove();
        });
      };
      if (open !== value) {
        for (let i = 0; i < outerDiv.children.length; i++) {
          const child = outerDiv.children.item(i)!;
          child.setAttribute("tabIndex", "-1");
        };
      } else {
        for (let i = 0; i < outerDiv.children.length; i++) {
          const child = outerDiv.children.item(i)!;
          child.setAttribute("tabIndex", "");
        };
      };
    };
  }, [outerDivRef, open, value]);

  return (
    <div ref={outerDivRef} aria-hidden={open !== value} aria-selected={accordionType === "single" ? open === value : undefined} className={cn("text-sm text-slate-900/70 transition-[max-height,padding] duration-300 overflow-y-clip", className, open !== value && "max-h-0 py-0", open === value && "max-h-[var(--mh)]")} {...props} />
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };