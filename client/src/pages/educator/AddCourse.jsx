import uniqid from "uniqid";
import Quill from 'quill';
import { act, useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";

const AddCourse = () => {

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false,
  })

  const handleChapter = (action, chapterId) => {
    if (action === 'add') {
      const title = prompt('Enter Chapter Name:');
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
          chapterOrder:chapters.length>0? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        }
        setChapters([...chapters,newChapter])
      }
    } else if (action === 'remove') {
      setChapters(chapters.filter((chapter) => chapter.chapterId !== chapterId));
    } else if (action === 'toggle') {
      setChapters(
        chapters.map((chapter) =>
          chapter.chapterId === chapterId ? { ...chapter, collapsed: !chapter.collapsed } : chapter
        )
      )
    }
  }

  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === 'add') {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === 'remove') {
      setChapters(chapters.map((chapter) => {
        if (chapter.chapterId === chapterId) {
          chapter.chapterContent.splice(lectureIndex,1)
        }
        return chapter;
      }))
    }
  }

  const addLecture = () => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter.chapterId === currentChapterId) {
          const newLecture = {
            ...lectureDetails,
            lectureOrder: chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1 : 1,
            lectureId:uniqid()
          }
          chapter.chapterContent.push(newLecture);
        }
        return chapter;
      })
    )
    setShowPopup(false);
    setLectureDetails({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree:false,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  }

  useEffect(() => {
    // Initiate Quill only once
    if (!quillRef.current && editorRef.current) { 
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      });
    }
  }, [])

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between p-4 md:p-8 md:pb-0 pt-8 pb-0">
  <form className="flex flex-col gap-6 max-w-md w-full text-gray-700" onSubmit={handleSubmit}>
    <div className="flex flex-col gap-2">
      <p className="font-medium">Course Title</p>
      <input
        onChange={(e) => setCourseTitle(e.target.value)}
        value={courseTitle}
        type="text"
        placeholder="Type here"
        className="outline-none py-2 px-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div className="flex flex-col gap-2">
      <p className="font-medium">Course Description</p>
      <div ref={editorRef} className="border border-gray-300 rounded-lg p-3"></div>
    </div>
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex flex-col gap-2">
        <p className="font-medium">Course Price</p>
        <input
          onChange={(e) => setCoursePrice(e.target.value)}
          value={coursePrice}
          type="number"
          placeholder="0"
          className="outline-none py-2 px-3 w-28 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex items-center gap-4">
        <p className="font-medium">Course Thumbnail</p>
        <label htmlFor="thumbnailImage" className="flex items-center gap-3">
          <img src={assets.file_upload_icon} alt="" className="p-3 bg-blue-500 rounded-lg" />
          <input
            type="file"
            id="thumbnailImage"
            onChange={(e) => setImage(e.target.files[0])}
            accept="image/*"
            hidden
          />
          <img className="max-h-12 rounded-lg" src={image ? URL.createObjectURL(image) : ''} alt="" />
        </label>
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p className="font-medium">Discount %</p>
      <input
        onChange={(e) => setDiscount(e.target.value)}
        type="number"
        value={discount}
        placeholder="0"
        min={0}
        max={100}
        className="outline-none py-2 px-3 w-28 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
    <div>
      {chapters.map((chapter, chapterIndex) => (
        <div key={chapterIndex} className="bg-gray-50 border border-gray-300 rounded-lg mb-4 shadow-sm">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img
                src={assets.dropdown_icon}
                width={14}
                alt=""
                className={`cursor-pointer transition-transform duration-200 ${
                  chapter.collapsed && '-rotate-90'
                }`}
                onClick={() => handleChapter('toggle', chapter.chapterId)}
              />
              <span className="font-semibold">{chapterIndex + 1}. {chapter.chapterTitle}</span>
            </div>
            <span className="text-sm text-gray-500">{chapter.chapterContent.length} Lectures</span>
            <img
              src={assets.cross_icon}
              alt=""
              className="cursor-pointer hover:bg-red-100 p-1 rounded"
              onClick={() => handleChapter('remove', chapter.chapterId)}
            />
          </div>
          {!chapter.collapsed && (
            <div className="p-4">
              {chapter.chapterContent.map((lecture, lectureIndex) => (
                <div key={lectureIndex} className="flex justify-between items-center mb-2 text-sm">
                  <span>
                    {lectureIndex + 1}. {lecture.lectureTitle} - {lecture.lectureDuration} mins -{' '}
                    <a href={lecture.lectureUrl} target="_blank" className="text-blue-500">
                      Link
                    </a>{' '}
                    - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                  </span>
                  <img
                    src={assets.cross_icon}
                    alt=""
                    className="cursor-pointer hover:bg-red-100 p-1 rounded"
                    onClick={() => handleLecture('remove', chapter.chapterId, lectureIndex)}
                  />
                </div>
              ))}
              <div
                className="inline-flex items-center bg-blue-50 text-blue-500 p-2 rounded-lg cursor-pointer hover:bg-blue-100 mt-2"
                onClick={() => handleLecture('add', chapter.chapterId)}
              >
                + Add Lecture
              </div>
            </div>
          )}
        </div>
      ))}
      <div
        className="flex justify-center items-center bg-blue-50 text-blue-500 p-2 rounded-lg cursor-pointer hover:bg-blue-100 mt-4"
        onClick={() => handleChapter('add')}
      >
        + Add Chapter
      </div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
          <div className="bg-white text-gray-700 p-6 rounded-lg shadow-lg relative w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
            <div className="mb-3">
              <p className="font-medium">Lecture Title</p>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500"
                value={lectureDetails.lectureTitle}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureTitle: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <p className="font-medium">Duration (minutes)</p>
              <input
                type="number"
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500"
                value={lectureDetails.lectureDuration}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureDuration: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <p className="font-medium">Lecture URL</p>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500"
                value={lectureDetails.lectureUrl}
                onChange={(e) => setLectureDetails({ ...lectureDetails, lectureUrl: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2 mb-4">
              <p className="font-medium">Is Preview Free?</p>
              <input
                type="checkbox"
                className="scale-125"
                value={lectureDetails.isPreviewFree}
                onChange={(e) => setLectureDetails({ ...lectureDetails, isPreviewFree: e.target.checked })}
              />
            </div>
            <button
              type="button"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={addLecture}
            >
              Add
            </button>
            <img
              onClick={() => setShowPopup(false)}
              src={assets.cross_icon}
              alt=""
              className="absolute top-4 right-4 w-4 cursor-pointer"
            />
          </div>
        </div>
      )}
    </div>
    <button
      type="submit"
      className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800"
    >
      ADD
    </button>
  </form>
    </div>

  )
}

export default AddCourse
