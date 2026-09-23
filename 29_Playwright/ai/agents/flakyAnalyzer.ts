/**
 * Flaky Test Analyzer.
 *
 * Diffs this build's per-test statuses against the previous build's snapshot.
 * A test that flipped between passed and failed across the two builds is flaky;
 * one that failed in both is genuinely failing.
 */

export type TestStatus = 'passed' | 'failed' | 'skipped' | 'timedOut';

export interface BuildSummary {
    runId: string;
    tests: Record<string, TestStatus>;
}

export interface FlakyResult {
    counts: { flaky: number; failing: number; total: number };
    flakyTests: string[];
    failingTests: string[];
    summary?: string;
}

const isFail = (s?: TestStatus) => s === 'failed' || s === 'timedOut';

export async function analyzeFlaky(
    prev: BuildSummary | undefined,
    curr: BuildSummary,
    _useLlm = false,
): Promise<FlakyResult> {
    const flakyTests: string[] = [];
    const failingTests: string[] = [];

    for (const [title, status] of Object.entries(curr.tests)) {
        const before = prev?.tests[title];
        if (before === undefined) continue;

        if (isFail(status) && isFail(before)) {
            failingTests.push(title);
        } else if (isFail(status) !== isFail(before)) {
            flakyTests.push(title);
        }
    }

    return {
        counts: { flaky: flakyTests.length, failing: failingTests.length, total: Object.keys(curr.tests).length },
        flakyTests,
        failingTests,
    };
}