"use client";
import { useState } from "react";
import { Button, Container, Title, Text, Group, Paper, Tooltip, Box, Stack } from "@mantine/core";

const tooltipTexts = {
    // FG
    "30": "Dark Gray (33%)",
    "31": "Red",
    "32": "Yellowish Green",
    "33": "Gold",
    "34": "Light Blue",
    "35": "Pink",
    "36": "Teal",
    "37": "White",
    // BG
    "40": "Blueish Black",
    "41": "Rust Brown",
    "42": "Gray (40%)",
    "43": "Gray (45%)",
    "44": "Light Gray (55%)",
    "45": "Blurple",
    "46": "Light Gray (60%)",
    "47": "Cream White",
};

export default function Home() {
    const [editorContent, setEditorContent] = useState(
        'Welcome to <span class="ansi-33">Rebane</span>\'s <span class="ansi-45"><span class="ansi-37">Discord</span></span> <span class="ansi-31">C</span><span class="ansi-32">o</span><span class="ansi-33">l</span><span class="ansi-34">o</span><span class="ansi-35">r</span><span class="ansi-36">e</span><span class="ansi-37">d</span> Text Generator!'
    );

    const applyStyle = (ansiCode) => {
        if (!window.getSelection) return;
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        if (ansiCode === "0") {
            const text = selection.toString();
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(text));
            return;
        }

        const range = selection.getRangeAt(0);
        const text = selection.toString();
        const span = document.createElement("span");
        span.innerText = text;
        span.classList.add(`ansi-${ansiCode}`);
        range.deleteContents();
        range.insertNode(span);
    };

    const nodesToANSI = (nodes, states = [{ fg: 2, bg: 2, st: 2 }]) => {
        let text = "";
        nodes.forEach((node) => {
            if (node.nodeType === 3) {
                text += node.textContent;
                return;
            }
            if (node.nodeName === "BR") {
                text += "\n";
                return;
            }
            const element = node;
            const ansiCode = +(element.className.split("-")[1]);
            const newState = { ...states[states.length - 1] };
            if (ansiCode < 30) newState.st = ansiCode;
            if (ansiCode >= 30 && ansiCode < 40) newState.fg = ansiCode;
            if (ansiCode >= 40) newState.bg = ansiCode;
            states.push(newState);
            text += `\x1b[${newState.st};${ansiCode >= 40 ? newState.bg : newState.fg}m`;
            text += nodesToANSI(node.childNodes, states);
            states.pop();
            text += `\x1b[0m`;
            if (states[states.length - 1].fg !== 2) text += `\x1b[${states[states.length - 1].st};${states[states.length - 1].fg}m`;
            if (states[states.length - 1].bg !== 2) text += `\x1b[${states[states.length - 1].st};${states[states.length - 1].bg}m`;
        });
        return text;
    };
    const copyText = async () => {
        const editor = document.getElementById("editor");
        if (!editor) return;
        const toCopy = "```ansi\n" + nodesToANSI(editor.childNodes) + "\n```";
        try {
            await navigator.clipboard.writeText(toCopy);
            //   toast.success("Copied to clipboard!");
        } catch (err) {
            //   toast.error("Failed to copy text");
            console.error("Copy failed:", err);
        }
    };


    const handleInput = (e) => {
        const content = e.target.value;
        const sanitized = content
            .replace(/<(\/?(br|span|span class="ansi-[0-9]*"))>/g, "[$1]")
            .replace(/<.*?>/g, "")
            .replace(/[<>]/g, "")
            .replace(/\[(\/?(br|span|span class="ansi-[0-9]*"))\]/g, "<$1>");
        setEditorContent(sanitized);
    };

    return (
        <Container className="min-h-screen bg-[#36393F] text-white p-8">

            <Paper className="max-w-4xl mx-auto text-center">
                <Title order={1} style={{ fontSize: "2.25rem", fontWeight: "bold", marginBottom: "2rem" }}>
                    Discord{" "}
                    <Text component="span" style={{ color: "#5865F2", fontWeight: "bold" }}>
                        Colored
                    </Text>{" "}
                    Text Generator
                </Title>
                <Box className="mb-12 space-y-4">
                    <Stack spacing="md">
                        <Title order={3} fw={600} size="2xl">
                            About
                        </Title>
                        <Text color="gray.6">
                            This is a simple app that creates colored Discord messages using the ANSI color codes
                            available on the latest Discord desktop versions.
                        </Text>
                        <Text color="gray.6">
                            To use this, write your text, select parts of it and assign colors to them,
                            then copy it using the button below, and send in a Discord message.
                        </Text>
                    </Stack>
                </Box>

                <Paper className="space-y-6">
                    <Group spacing="md" className="space-x-3.5">
                        <Button variant="default" onClick={() => applyStyle("0")}>
                            Reset All
                        </Button>
                        <Button variant="default" fw={700} onClick={() => applyStyle("1")}>
                            Bold
                        </Button>
                        <Button variant="default" td="underline" onClick={() => applyStyle("4")}>
                            Line
                        </Button>
                    </Group>

                    {/* FG Colors */}
                    <div className="space-y-4">
                        <Group>
                            <Text className="mr-4 font-semibold">FG</Text>
                            {[30, 31, 32, 33, 34, 35, 36, 37].map((code) => (
                                <Box key={code} className="relative inline-block">
                                    <Button
                                        variant="outline"
                                        className={`w-8 h-8 p-0 mx-1 ansi-${code}-bg`}
                                        onClick={() => applyStyle(code.toString())}
                                    />
                                    {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 bg-gray-700 text-white text-xs px-2 py-1 rounded transition-opacity group-hover:opacity-100">
                                    {tooltipTexts[code]}
                                        </div> */}
                                </Box>
                            ))}
                        </Group>

                        {/* BG Colors */}
                        <div>
                            <Text className="mr-4 font-semibold">BG</Text>
                            {[40, 41, 42, 43, 44, 45, 46, 47].map((code) => (
                                <Box key={code} className="relative inline-block group">
                                    <Button
                                        variant="outline"
                                        className={`w-8 h-8 p-0 mx-1 ansi-${code}`}
                                        onClick={() => applyStyle(code.toString())}
                                    />
                                    {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 bg-gray-700 text-white text-xs px-2 py-1 rounded transition-opacity group-hover:opacity-100">
                    {tooltipTexts[code]}
                  </div> */}
                                </Box>
                            ))}
                        </div>
                    </div>
                            {/* Mantine’s <Textarea> does not support rich text formatting (color changes, bold, etc.) so i use contentEditable div */}
                    <div
                        id="editor"
                        contentEditable
                        className="w-full h-48 bg-[#2F3136] text-[#B9BBBE] rounded-lg p-4 font-mono text-sm leading-relaxed resize-y overflow-auto text-left"
                        dangerouslySetInnerHTML={{ __html: editorContent }}
                        onInput={(e) => {
                            const content = e.currentTarget.innerHTML;
                            const sanitized = content
                                .replace(/<(\/?(br|span|span class="ansi-[0-9]*"))>/g, "[$1]")
                                .replace(/<.*?>/g, "")
                                .replace(/[<>]/g, "")
                                .replace(/\[(\/?(br|span|span class="ansi-[0-9]*"))\]/g, "<$1>");
                            if (content !== sanitized) {
                                e.currentTarget.innerHTML = sanitized;
                            }
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                document.execCommand("insertLineBreak");
                            }
                        }}
                    />

                    <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white" onClick={copyText}>
                        Copy text as Discord formatted
                    </Button>
                </Paper>
                <Text className="text-sm text-gray-400 mt-8">
                    This is an unofficial tool, it is not made or endorsed by Discord.
                </Text>
            </Paper>
        </Container>
    );
}




