"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  REQUIREMENT_LABEL,
  DEFAULT_REQUIREMENTS,
  type RequirementCode,
} from "@/config/compliance";
import {
  facultyAccountSchema,
  type FacultyAccountFormInput,
} from "@/features/faculty-management/schemas/faculty-account.schema";

type RequirementStatus = "not_submitted" | "uploaded" | "validated";

type FacultyAccount = {
  id: string;
  fullName: string;
  email: string;
  programCode: string;
  programName: string;
  requirementStatus: Record<RequirementCode, RequirementStatus>;
};

const PROGRAMS = [
  { code: "BSIT", name: "BS Information Technology" },
  { code: "BSBA", name: "BS Business Administration" },
  { code: "BSE", name: "BS Entrepreneurship" },
  { code: "BSA", name: "BS Accountancy" },
] as const;

function buildInitialRequirementStatus(): Record<
  RequirementCode,
  RequirementStatus
> {
  return DEFAULT_REQUIREMENTS.reduce(
    (acc, requirementCode) => {
      acc[requirementCode] = "not_submitted";
      return acc;
    },
    {} as Record<RequirementCode, RequirementStatus>,
  );
}

function statusLabel(status: RequirementStatus): string {
  if (status === "not_submitted") {
    return "Not Submitted";
  }

  if (status === "uploaded") {
    return "Uploaded - For Validation";
  }

  return "Validated by Admin";
}

export function AdminFacultyDashboard() {
  const [facultyAccounts, setFacultyAccounts] = useState<FacultyAccount[]>([]);
  const [selectedFacultyId, setSelectedFacultyId] = useState<string | null>(
    null,
  );

  const form = useForm<FacultyAccountFormInput>({
    resolver: zodResolver(facultyAccountSchema),
    defaultValues: {
      fullName: "",
      email: "",
      programCode: "",
    },
  });

  const selectedFaculty = useMemo(
    () =>
      facultyAccounts.find((faculty) => faculty.id === selectedFacultyId) ??
      null,
    [facultyAccounts, selectedFacultyId],
  );

  const metrics = useMemo(() => {
    const totalFaculty = facultyAccounts.length;
    const totalUploads = facultyAccounts.reduce((sum, faculty) => {
      const uploaded = Object.values(faculty.requirementStatus).filter(
        (status) => status !== "not_submitted",
      ).length;
      return sum + uploaded;
    }, 0);
    const totalValidated = facultyAccounts.reduce((sum, faculty) => {
      const validated = Object.values(faculty.requirementStatus).filter(
        (status) => status === "validated",
      ).length;
      return sum + validated;
    }, 0);

    return {
      totalFaculty,
      totalPrograms: new Set(
        facultyAccounts.map((faculty) => faculty.programCode),
      ).size,
      totalUploads,
      totalValidated,
    };
  }, [facultyAccounts]);

  function onAddFaculty(input: FacultyAccountFormInput) {
    const program = PROGRAMS.find((item) => item.code === input.programCode);
    if (!program) {
      return;
    }

    const newFaculty: FacultyAccount = {
      id: crypto.randomUUID(),
      fullName: input.fullName,
      email: input.email,
      programCode: program.code,
      programName: program.name,
      requirementStatus: buildInitialRequirementStatus(),
    };

    setFacultyAccounts((prev) => [newFaculty, ...prev]);
    setSelectedFacultyId(newFaculty.id);
    form.reset({ fullName: "", email: "", programCode: "" });
  }

  function onDeleteFaculty(facultyId: string) {
    setFacultyAccounts((prev) =>
      prev.filter((faculty) => faculty.id !== facultyId),
    );
    if (selectedFacultyId === facultyId) {
      setSelectedFacultyId(null);
    }
  }

  function updateRequirementStatus(
    facultyId: string,
    requirementCode: RequirementCode,
    status: RequirementStatus,
  ) {
    setFacultyAccounts((prev) =>
      prev.map((faculty) => {
        if (faculty.id !== facultyId) {
          return faculty;
        }

        return {
          ...faculty,
          requirementStatus: {
            ...faculty.requirementStatus,
            [requirementCode]: status,
          },
        };
      }),
    );
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Faculty Accounts"
          value={String(metrics.totalFaculty)}
        />
        <StatCard
          label="Programs Assigned"
          value={String(metrics.totalPrograms)}
        />
        <StatCard
          label="Uploaded Requirements"
          value={String(metrics.totalUploads)}
        />
        <StatCard
          label="Validated Requirements"
          value={String(metrics.totalValidated)}
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <article className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Add Faculty Account</h2>
          <p className="mt-1 text-sm text-slate-400">
            Assign each faculty member to a program so required uploads follow
            the program curriculum template.
          </p>

          <form
            className="mt-4 space-y-3"
            onSubmit={form.handleSubmit(onAddFaculty)}
          >
            <div>
              <label className="text-sm text-slate-300" htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:ring focus:ring-amber-300/30"
                placeholder="Juan Dela Cruz"
                {...form.register("fullName")}
              />
              <FieldError message={form.formState.errors.fullName?.message} />
            </div>

            <div>
              <label className="text-sm text-slate-300" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:ring focus:ring-amber-300/30"
                placeholder="faculty@pup.edu.ph"
                {...form.register("email")}
              />
              <FieldError message={form.formState.errors.email?.message} />
            </div>

            <div>
              <label className="text-sm text-slate-300" htmlFor="programCode">
                Program Assignment
              </label>
              <select
                id="programCode"
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none focus:ring focus:ring-amber-300/30"
                {...form.register("programCode")}
              >
                <option value="">Select program</option>
                {PROGRAMS.map((program) => (
                  <option key={program.code} value={program.code}>
                    {program.code} - {program.name}
                  </option>
                ))}
              </select>
              <FieldError
                message={form.formState.errors.programCode?.message}
              />
            </div>

            <Button className="w-full" type="submit">
              Add Faculty Account
            </Button>
          </form>
        </article>

        <article className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold">Faculty Accounts</h2>
          <p className="mt-1 text-sm text-slate-400">
            View, select, and delete faculty account entries.
          </p>

          <div className="mt-4 space-y-3">
            {facultyAccounts.length === 0 ? (
              <p className="rounded-md border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-400">
                No faculty accounts yet. Add one using the form.
              </p>
            ) : (
              facultyAccounts.map((faculty) => (
                <div
                  key={faculty.id}
                  className="rounded-md border border-slate-700 bg-slate-950 p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedFacultyId(faculty.id)}
                      className="text-left"
                    >
                      <p className="font-medium">{faculty.fullName}</p>
                      <p className="text-sm text-slate-400">{faculty.email}</p>
                      <p className="text-xs text-amber-300">
                        Program: {faculty.programCode}
                      </p>
                    </button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onDeleteFaculty(faculty.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      <section className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <h2 className="text-lg font-semibold">
          Curriculum-Based Requirement Validation
        </h2>
        <p className="mt-1 text-sm text-slate-400">
          Admin validates uploads submitted by selected faculty based on
          required curriculum documents.
        </p>

        {!selectedFaculty ? (
          <p className="mt-4 rounded-md border border-dashed border-slate-700 px-4 py-6 text-sm text-slate-400">
            Select a faculty account to manage requirement uploads and
            validation.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            <div className="rounded-md border border-slate-700 bg-slate-950 p-3 text-sm">
              <p>
                <span className="text-slate-400">Selected Faculty:</span>{" "}
                {selectedFaculty.fullName}
              </p>
              <p>
                <span className="text-slate-400">Assigned Program:</span>{" "}
                {selectedFaculty.programName}
              </p>
            </div>

            {DEFAULT_REQUIREMENTS.map((requirementCode) => {
              const status = selectedFaculty.requirementStatus[requirementCode];
              return (
                <article
                  key={requirementCode}
                  className="rounded-md border border-slate-700 bg-slate-950 p-4"
                >
                  <p className="font-medium">
                    {REQUIREMENT_LABEL[requirementCode]}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Status: {statusLabel(status)}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={status !== "not_submitted"}
                      onClick={() =>
                        updateRequirementStatus(
                          selectedFaculty.id,
                          requirementCode,
                          "uploaded",
                        )
                      }
                    >
                      Mark Uploaded
                    </Button>
                    <Button
                      size="sm"
                      disabled={status !== "uploaded"}
                      onClick={() =>
                        updateRequirementStatus(
                          selectedFaculty.id,
                          requirementCode,
                          "validated",
                        )
                      }
                    >
                      Validate as Admin
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        updateRequirementStatus(
                          selectedFaculty.id,
                          requirementCode,
                          "not_submitted",
                        )
                      }
                    >
                      Reset
                    </Button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-lg border border-slate-700 bg-slate-900 p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </article>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-400">{message}</p>;
}
