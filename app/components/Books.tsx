import Fancybox from "./Fancybox";

interface Props {
  data: Book[];
}

interface Book {
  content: string;
  imageUrl: string;
  slug: string;
  title: string;
}

export default function Books({ data }: Props) {
  return (
    <div id="features">
      <Fancybox>
        {data.map(({ content, imageUrl, slug, title }) => (
          <div key={slug}>
            <br className="clear" />
            <div className="four columns offset-by-four book-image">
              <a className="fancybox" data-fancybox="gallery" href={imageUrl}>
                <img
                  className="four columns imagedropshadow"
                  src={imageUrl}
                  alt={title}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = "/images/book-image-unavailable.png";
                  }}
                />
              </a>
            </div>
            <div className="four columns offset-by-one description">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
            <br className="clear" />
          </div>
        ))}
      </Fancybox>
    </div>
  );
}
