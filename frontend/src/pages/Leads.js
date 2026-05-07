import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/ui/PageHeader";
import LeadForm from "../components/ui/LeadForm";
import LeadFilters from "../components/ui/LeadFilters";
import LeadCard from "../components/ui/LeadCard";

function Leads() {
  const [leads, setLeads] = useState([]);

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [source, setSource] = useState("");
  const [assigned, setAssigned] = useState("");
  const [value, setValue] = useState("");
  const [editData, setEditData] = useState({});

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [assignedFilter, setAssignedFilter] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [editingId, setEditingId] = useState(null);

  const navigate = useNavigate();

  // load leads
  const loadLeads = () => {
    API.get("/leads").then((res) => setLeads(res.data));
  };

  useEffect(() => {
    loadLeads();
  }, []);

  // create lead
  const addLead = async () => {
    const nextErrors = {};

    if (!phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    }

    if (!value.trim()) {
      nextErrors.value = "Deal value is required.";
    }

    if (!/^\d+$/.test(phone)) {
      nextErrors.phone = "Phone number must contain digits only.";
    }

    if (!/^\d+$/.test(value)) {
      nextErrors.value = "Deal value must contain digits only.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    setFormErrors({});

    await API.post("/leads", null, {
      params: {
        name,
        company,
        email,
        phone,
        source,
        assigned_to: assigned,
        deal_value: value
      }
    });

    // clear fields
    setName("");
    setCompany("");
    setEmail("");
    setPhone("");
    setSource("");
    setAssigned("");
    setValue("");

    loadLeads();
  };

  // delete lead
  const deleteLead = async (id) => {
    await API.delete(`/leads/${id}`);
    loadLeads();
  };

  // update status
  const updateStatus = async (id, status) => {
    await API.put(`/leads/${id}`, null, {
      params: { status }
    });
    loadLeads();
  };

  return (
    <main className="app-page">
      <div className="app-main">
        <PageHeader
          kicker="Pipeline"
          title="Leads"
          subtitle="Track prospects, update deal status, and keep the pipeline organized in one place."
        />

        <div className="section-grid section-grid--two" style={{ marginBottom: "1rem" }}>
          <LeadForm
            values={{ name, company, email, phone, source, assigned, value }}
            errors={formErrors}
            onChange={(field, newValue) => {
              if (field === "name") setName(newValue);
              if (field === "company") setCompany(newValue);
              if (field === "email") setEmail(newValue);
              if (field === "phone") setPhone(newValue);
              if (field === "source") setSource(newValue);
              if (field === "assigned") setAssigned(newValue);
              if (field === "value") setValue(newValue);

              if (formErrors[field]) {
                setFormErrors((currentErrors) => {
                  const nextErrors = { ...currentErrors };
                  delete nextErrors[field];
                  return nextErrors;
                });
              }
            }}
            onSubmit={addLead}
          />

          <div className="content-panel card-section">
            <p className="page-kicker">Filters</p>
            <h2 className="page-title" style={{ fontSize: "1.4rem" }}>
              Narrow the list
            </h2>
            <p className="page-subtitle">Search and filter the leads by key business traits.</p>

            <div style={{ marginTop: "1rem" }}>
              <LeadFilters
                search={search}
                statusFilter={statusFilter}
                sourceFilter={sourceFilter}
                assignedFilter={assignedFilter}
                onSearch={setSearch}
                onStatusChange={setStatusFilter}
                onSourceChange={setSourceFilter}
                onAssignedChange={setAssignedFilter}
              />
            </div>
          </div>
        </div>

        <div className="section-grid">
          {leads
        .filter((lead) => {
          const searchMatch =
            lead.name?.toLowerCase().includes(search.toLowerCase()) ||
            lead.company?.toLowerCase().includes(search.toLowerCase()) ||
            lead.email?.toLowerCase().includes(search.toLowerCase());

          const statusMatch = statusFilter
            ? lead.status === statusFilter
            : true;

          const sourceMatch = sourceFilter
            ? lead.source === sourceFilter
            : true;

          const assignedMatch = assignedFilter
            ? (lead.assigned_to || "").toLowerCase().includes(assignedFilter.toLowerCase())
            : true;

          return searchMatch && statusMatch && sourceMatch && assignedMatch;
        })
        .map((lead) => (
          <LeadCard
            key={lead.id}
            lead={lead}
            onOpen={(id) => navigate(`/leads/${id}`)}
            onStatusChange={updateStatus}
            onDelete={deleteLead}
            onEdit={(item) => {
              setEditingId(item.id);
              setEditData({ ...item });
            }}
            editing={editingId === lead.id}
            editData={editData}
            onEditChange={(field, newValue) => setEditData({ ...editData, [field]: newValue })}
            onSave={async () => {
              await API.put(`/leads/edit/${lead.id}`, null, {
                params: {
                  name: editData.name,
                  company: editData.company,
                  email: editData.email,
                  phone: editData.phone,
                  source: editData.source,
                  assigned_to: editData.assigned_to,
                  deal_value: editData.deal_value
                }
              });

              setEditingId(null);
              loadLeads();
            }}
          />
        ))}
        </div>
      </div>
    </main>
  );
}

export default Leads;