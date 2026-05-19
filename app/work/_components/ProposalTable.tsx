"use client";

import { ProposalSectionHeader } from "./ProposalSectionHeader";

export function ProposalTable({
  tagline,
  heading,
  headerBody,
  bg = "light",
  columns,
}: {
  tagline: string;
  heading: string;
  headerBody?: string;
  bg?: "dark" | "light";
  columns: { header: string; cells: string[] }[];
}) {
  const isDark = bg === "dark";
  const headerBg = isDark ? "bg-[#2B5442]" : "bg-[#2B5442]";
  const cellBorder = isDark ? "border-white/10" : "border-[#213F31]/10";
  const cellText = isDark ? "text-white/90" : "text-[#213F31]";
  const headerText = "text-white font-semibold";

  const rowCount = columns[0]?.cells.length ?? 0;

  return (
    <div className="space-y-16">
      <ProposalSectionHeader tagline={tagline} heading={heading} body={headerBody} bg={bg} />
      <div className="overflow-x-auto">
        <table className={`w-full border-collapse border ${cellBorder} text-sm md:text-base`}>
          <thead>
            <tr className={headerBg}>
              {columns.map((col, i) => (
                <th key={i} className={`border ${cellBorder} px-6 py-4 text-left ${headerText}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rowCount }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={`border ${cellBorder} px-6 py-4 ${cellText}`}>
                    {col.cells[rowIdx] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
