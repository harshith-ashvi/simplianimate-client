const DashboardLayout = ({
  children,
  isTemplate = true,
}: {
  children: React.ReactNode;
  isTemplate?: boolean;
}) => {
  return (
    <div
      className={
        isTemplate ? "md:h-screen-minus-45 max-md:h-screen-minus-70" : ""
      }
    >
      {children}
    </div>
  );
};

export default DashboardLayout;
