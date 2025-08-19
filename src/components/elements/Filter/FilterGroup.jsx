const FilterGroup = ({ title, children }) => {
  return (
    <div className='space-y-2'>
      <p className='text-xs font-medium text-gray-500 dark:text-gray-400'>
        {title}
      </p>
      <div className='space-y-1'>{children}</div>
    </div>
  );
};

export default FilterGroup;
