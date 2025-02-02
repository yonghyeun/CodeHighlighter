const Introduction = () => {
  return (
    <div className='container md:hidden mx-auto px-4 py-8 w-[90%] min-w-[390px]'>
      <h2 className='text-2xl font-semibold mb-4'>Key Features</h2>
      <ul className='list-disc list-inside space-y-4'>
        <li>
          <strong>Code Language Selection:</strong> Choose from a variety of
          programming languages to highlight your code accurately.
        </li>
        <li>
          <strong>Theme Setting:</strong> Personalize the appearance of your
          code with multiple theme options.
        </li>
        <li>
          <strong>Code Start Number Setting:</strong> Define the starting line
          number for your code to provide better context.
        </li>
        <li>
          <strong>Code Highlighting Options:</strong> Highlight your code with
          three distinct styles:
          <ul className='list-disc list-inside mt-2 space-y-2 pl-4'>
            <li>
              <strong>Add:</strong> Highlight added lines with a specific color.
            </li>
            <li>
              <strong>Remove:</strong> Highlight removed lines with a different
              color.
            </li>
            <li>
              <strong>Pointing:</strong> Highlight specific lines that need
              attention.
            </li>
          </ul>
        </li>
        <li>
          <strong>Color Setting and Line Setting:</strong> Customize the colors
          used for highlighting and specify which lines should be highlighted.
        </li>
      </ul>
      <p className='text-lg  mt-6'>
        You can view the entire code on{' '}
        <a
          href='https://github.com/yonghyeun/CodeHighlighter'
          className='text-blue-500 '
        >
          GitHub
        </a>
        .
      </p>
    </div>
  );
};

export default Introduction;
