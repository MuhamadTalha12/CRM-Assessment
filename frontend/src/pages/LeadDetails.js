import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";
import PageHeader from "../components/ui/PageHeader";
import NotesPanel from "../components/ui/NotesPanel";

function LeadDetail() {
  const { id } = useParams();
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  // load notes
  const loadNotes = () => {
    API.get(`/leads/${id}/notes`).then((res) => setNotes(res.data));
  };

  useEffect(() => {
    loadNotes();
  }, [id]);

  const addNote = async () => {
    await API.post(`/leads/${id}/notes`, null, {
      params: { content }
    });

    setContent("");
    loadNotes();
  };

  return (
    <main className="app-page">
      <div className="app-main">
        <PageHeader
          kicker="Lead detail"
          title="Lead Notes"
          subtitle="Capture conversations, next steps, and important follow-up context."
        />

        <NotesPanel content={content} onContentChange={setContent} onSubmit={addNote} notes={notes} />
      </div>
    </main>
  );
}

export default LeadDetail;