import assert from "node:assert/strict";
import test from "node:test";
import { calculateComplianceProgress } from "@/features/compliance-management/services/compliance-engine.service";

test("calculateComplianceProgress computes percentage", () => {
  const result = calculateComplianceProgress([
    { requirementCode: "grade_sheet", status: "compliant" },
    { requirementCode: "enhanced_syllabus", status: "compliant" },
    { requirementCode: "class_orientation", status: "uploaded" },
    { requirementCode: "midterm_package", status: "uploaded" },
    { requirementCode: "final_package", status: "not_started" },
    { requirementCode: "class_records", status: "not_started" },
  ]);

  assert.equal(result.total, 6);
  assert.equal(result.compliantCount, 2);
  assert.equal(result.percentage, 33);
});
