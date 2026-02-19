import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from 'lucide-react'

const NoteDetailPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate();

  const { id } = useParams();

  console.log(id);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        // console.log("this is from res", res.data);
        setNote(res.data);
      } catch (error) {
        console.log("Error in fetching note", error);
        toast.error("Failed to fetch the note.");
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [id]);

  // console.log({ note })

  if (loading) return (
    <div className="min-h-screen bg-base-200 flex justify-center items-center">
      <LoaderIcon className="animate-spin size-10"></LoaderIcon>
    </div>
  )

  const handleDelete = async () => {

        if(!window.confirm("Are you sure you want to delete this note?")) return;

        try {
            await api.delete(`/notes/${id}`);
            toast.success("Note has been deleted.")
            navigate("/");
        } catch (error) {
            console.log("Error in deleting note", error);
            toast.error("Cannot be deleted. Please try again later.");
        }
    }

  const handleEdit = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title and content");
      return;
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note has been updated.");
      navigate("/");
    } catch (error) {
      console.log("Error in updating note", error)
      toast.error("Error in updating note. Please try again later.");
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className='flex justify-between items-center mb-6'>
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className='h-5 w-5' />Back to Notes</Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className='h-5 w-5' /> Delete Note
            </button>
          </div>

          <div className='card bg-base-100'>
            <div className="card-body">
                <div className='form-control mb-4'>
                  <label className='label mb-2'>
                    <span className='label-text'>Title</span>
                  </label>
                  <input type="text"
                    placeholder='Note Title' className='input input-bordered w-full'
                    value={note.title}
                    onChange={(e) => setNote({...note, title: e.target.value})}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label mb-2">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea placeholder='Write your note here...'
                    className='textarea textarea-bordered h-32 w-full pl-4 pt-4'
                    value={note.content}
                    onChange={(e) => setNote({...note, content: e.target.value})}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button onClick={handleEdit} className='btn btn-primary' disabled={saving}>
                    {saving ? "Saving..." : "Save Note"}
                  </button>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage