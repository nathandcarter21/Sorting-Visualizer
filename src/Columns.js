const Columns = ({ array }) => {
    return (<div className="columns">
        {
            array.map((value, index) => {
                return (
                    <div className="col" style={{ height: `${value * .75}px` }} key={index}>
                    </div >
                )
            })
        }
    </div>);
}

export default Columns;