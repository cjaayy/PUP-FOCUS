import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { DEFAULT_REQUIREMENTS } from "@/config/compliance";

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    const { data: assignments, error: queryError } = await supabase
      .from("faculty_program_assignments")
      .select(
        `
        faculty_profile_id,
        program_id,
        programs(code, name),
        profiles(id, full_name, email)
      `,
      )
      .limit(100);

    if (queryError) {
      console.error("Query error:", queryError);
      return NextResponse.json(
        { error: "Failed to fetch faculty", details: queryError.message },
        { status: 500 },
      );
    }

    console.log("Found assignments:", assignments?.length || 0);

    const faculty =
      assignments
        ?.map((item: any) => ({
          id: item.faculty_profile_id,
          fullName: item.profiles?.full_name || "Unknown",
          email: item.profiles?.email || "Unknown",
          programCode: item.programs?.code || "Unknown",
          programName: item.programs?.name || "Unknown",
          requirementStatus: Object.fromEntries(
            DEFAULT_REQUIREMENTS.map((req: any) => [req.code, "not_submitted"]),
          ),
        }))
        .filter(
          (value: any, index: number, self: any[]) =>
            self.findIndex((v) => v.id === value.id) === index,
        ) || [];

    return NextResponse.json({ faculty });
  } catch (error) {
    console.error("Unexpected error in list:", error);
    return NextResponse.json(
      { error: "Failed to fetch faculty", details: String(error) },
      { status: 500 },
    );
  }
}
