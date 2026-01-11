export default function EmptyPatientState() {
    return (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card p-12 text-center text-muted-foreground">
            <p className="text-xl font-semibold">No patients found</p>
            <p className="mt-2 text-sm">
                Get started by registering a new patient.
            </p>
        </div>
    );
}
