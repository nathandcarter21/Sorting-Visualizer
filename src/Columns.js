const Columns = ({ array }) => {
    return (<div className="columns">
        {
            array.map((value, index) => {
                return (
                    <div className="col" style={{ height: `${(index + 1) * 5}px` }} key={index}>
                    </div >
                )
            })
        }
    </div>);
}

export default Columns;