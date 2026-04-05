function Skeleton() {
    return (
        <div className="skeleton-wrapper">

            {/* Movie Info Skeleton */}
            <div className="skeleton-info-card">
                <div className="skeleton-tags">
                    <div className="skeleton-tag"></div>
                    <div className="skeleton-tag"></div>
                    <div className="skeleton-tag"></div>
                </div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
            </div>

            {/* Review Card Skeleton */}
            <div className="skeleton-card">
                <div className="skeleton-poster"></div>
                <div className="skeleton-content">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-stars"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                </div>
            </div>

        </div>
    );
}

export default Skeleton;