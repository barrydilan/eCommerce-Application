import Header from '../widgets/Header/Header';
import NavBlock from '../pages/NavBlock/NavBlock';

export default function App() {
  return (
    <main
      className="
        mx-auto 
        grid 
        min-h-screen 
        grid-cols-1
        grid-rows-mobGridRows
        2xl:container
        md:grid-cols-tabGridCols
        md:grid-rows-tabGridRows
        lg:grid-cols-deskGridCols
        "
    >
      <Header />
      <div
        className="
          md:col-start-2
          md:col-end-3
          md:row-start-2
          md:row-end-3
          "
      >
        Main content will be here
      </div>
      <NavBlock />
    </main>
  );
}
