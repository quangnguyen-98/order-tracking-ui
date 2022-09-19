import './styles.scss';
const ColumnHeader = (props: any) => {

  const getClassName = (sort: any, columnName: any) => {
    let className = '';
    if (sort) {
      if (sort[columnName] === 1) {
        className = 'fa-solid fa-caret-up';
      }
      if (sort[columnName] === -1) {
        className = 'fa-solid fa-caret-down';
      }
    }
    return (<i className={className}></i >);
  };

  const onHandleUpdateSort = (sort: any, columnName: any) => {
    console.log('sort', sort);
    console.log('columnName', columnName);
    let newSort: any = {};
    const keyName = Object.keys(sort)[0];
    if (![undefined, null].includes(sort[keyName]) && (keyName === columnName)) {
      newSort = { ...sort };
      newSort[keyName] = (sort[keyName] === 1 ? -1 : 1);
    } else {
      newSort[columnName] = 1;
    }
    onUpdateSort(newSort);
  };

  const { sort, loading, columnName, onUpdateSort, columnCaption } = props;
  return (
    <th className={'column__header'}>
      <div className={`${loading ? 'column__header--loading' : 'column__header--normal'}`} onClick={() => { onHandleUpdateSort(sort, columnName); }}>
        <span>
          {columnCaption}
        </span>
        <span>
          {columnName && (<span className='sort__icon'>
            {getClassName(sort, columnName)}
          </span>)
          }
        </span>
      </div>
    </th>
  );

};

export default ColumnHeader;