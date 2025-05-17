import { createBrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainContainer from "../components/MainContainer";
import NoteViewer from "../components/NoteViewer";
import Home from "../components/Home";
import ViewNotes from "../components/ViewNotes";
import NoteEditor from "../components/NoteEditor";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        <MainContainer>
          <Home />
        </MainContainer>
        <Footer />
      </div>
    ),
  },
  {
    path: "/notes",
    element: (
      <div>
        <Header />
        <MainContainer>
          <ViewNotes />
        </MainContainer>
        <Footer />
      </div>
    ),
  },
  {
    path: "notes/:notesId",
    element: (
      <div>
        <Header />
        <MainContainer>
          <NoteViewer />
        </MainContainer>
        <Footer />
      </div>
    ),
  },
  {
    path: "notes/:notesId/update",
    element: (
      <div>
        <Header />
        <MainContainer>
          <NoteEditor />
        </MainContainer>
        <Footer />
      </div>
    ),
  },
]);

export default router;
