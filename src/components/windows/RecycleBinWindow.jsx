function DeletedItemCard({ item, onOpen }) {
  return (
    <button type="button" className="recycle-item-card" onClick={() => onOpen(item)}>
      <span className="recycle-item-card__icon" aria-hidden="true">
        📄
      </span>
      <span className="recycle-item-card__copy">
        <strong>{item.name}</strong>
        <span>{item.description}</span>
        {item.date_deleted && <em>Deleted {item.date_deleted}</em>}
      </span>
    </button>
  )
}

export default function RecycleBinWindow({ items, onOpenItem }) {
  return (
    <article className="recycle-bin-window">
      <header className="recycle-bin-window__hero">
        <div className="recycle-bin-window__hero-bg" aria-hidden="true" />
        <div className="recycle-bin-window__hero-content">
          <p className="recycle-bin-window__eyebrow">Storage</p>
          <h2>Recycle Bin</h2>
          <p>Abandoned ideas, superseded projects, and things that didn&apos;t ship.</p>
        </div>
      </header>

      <div className="recycle-bin-window__body">
        {items.map((item) => (
          <DeletedItemCard item={item} key={item.name} onOpen={onOpenItem} />
        ))}
      </div>
    </article>
  )
}
