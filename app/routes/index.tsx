export default function Index() {
  return (
    <>
      <img
        className="four columns offset-by-one"
        src="images/marco-ignazio-de-santis.jpg"
        alt="Foto Marco Ignazio de Santis"
      />
      <ul
        id="left-categories"
        className="four columns offset-by-one categories"
      >
        <li className="poesia">
          <h3>
            <a href="/opere/poesia">Poesia</a>
          </h3>
        </li>
        <li className="narrativa">
          <h3>
            <a href="/opere/narrativa">Narrativa</a>
          </h3>
        </li>
        <li className="critica-letteraria">
          <h3>
            <a href="/opere/critica-letteraria">Critica Letteraria</a>
          </h3>
        </li>
        <li className="storiografia">
          <h3>
            <a href="/opere/storiografia">Storiografia</a>
          </h3>
        </li>
      </ul>
      <ul className="four columns offset-by-one roffset-by-one categories">
        <li className="etnografia">
          <h3>
            <a href="/opere/etnografia">Etnografia</a>
          </h3>
        </li>
        <li className="dialettologia">
          <h3>
            <a href="/opere/dialettologia">Dialettologia</a>
          </h3>
        </li>
        <li className="linguistica">
          <h3>
            <a href="/opere/linguistica">Linguistica</a>
          </h3>
        </li>
        <li className="giornalismo">
          <h3>
            <a href="/opere/giornalismo">Giornalismo</a>
          </h3>
        </li>
      </ul>
    </>
  );
}
