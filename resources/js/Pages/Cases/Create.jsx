import { useForm } from "@inertiajs/react";

export default function Create({ survivors }) {
    const { data, setData, post, processing } = useForm({
        survivor_id: "",
        incident_type: "",
        description: "",
        incident_date: "",
        priority: "normal",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("cases.store"));
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    Create New GBV Case
                </div>

                <div className="card-body">
                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label>Survivor</label>
                            <select
                                className="form-control"
                                onChange={(e) =>
                                    setData("survivor_id", e.target.value)
                                }
                            >
                                <option value="">Select Survivor</option>
                                {survivors.map((s) => (
                                    <option key={s.id} value={s.id}>
                                        {s.unique_code}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Incident Type</label>
                            <input
                                className="form-control"
                                onChange={(e) =>
                                    setData("incident_type", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label>Description</label>
                            <textarea
                                className="form-control"
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                        </div>

                        <div className="mb-3">
                            <label>Incident Date</label>
                            <input
                                type="date"
                                className="form-control"
                                onChange={(e) =>
                                    setData("incident_date", e.target.value)
                                }
                            />
                        </div>

                        <button
                            disabled={processing}
                            className="btn btn-success"
                        >
                            Save Case
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
