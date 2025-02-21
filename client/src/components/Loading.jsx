const ContentWrapper = ({ children }) => {
  return (
    <div>
      <style>{`
        // ...existing code...
      `}</style>
      {children}
    </div>
  );
};

const LoadingScreen = () => {
  return (
    <ContentWrapper>
      // ...existing code...
    </ContentWrapper>
  );
};

export default LoadingScreen;
