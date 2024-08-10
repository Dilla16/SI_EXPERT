import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import PropTypes from "prop-types";
import { useHistoryContext } from "./../historyContext"; // Make sure to import useHistoryContext
import Loading from "@/components/loading";

const DetailRetur = ({ data, isEditableDetails, handleEdit, formatDate }) => {
  const { history, loading, error } = useHistoryContext();

  if (loading) return <Loading />;
  if (error) return <div>Error loading history: {error.message}</div>;

  // Filter history to only include records with status 'created'
  const createdStatusHistory = history.filter((record) => record.status === "created");

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-8">
          {[
            { id: "retur_no", label: "Return Number", value: data.retur_no },
            { id: "customer_name", label: "Customer Name", value: data.customer_name },
            { id: "country", label: "Country", value: data.country },
            { id: "family_name", label: "Family Name", value: data.products.families.family_name },
            { id: "product_id", label: "Product Name", value: data.products.product_name },
            { id: "qty", label: "Quantity", value: data.qty },
            { id: "serial_no", label: "Serial Number", value: data.serial_no },
            { id: "issue", label: "Issue", value: data.issue },
          ].map((field) => (
            <div
              key={field.id}
              className="flex items-center space-x-4"
            >
              <Label
                htmlFor={field.id}
                className="w-1/3 text-left"
              >
                {field.label}
              </Label>
              <div className="w-2/3 flex items-center space-x-2">
                <Input
                  id={field.id}
                  defaultValue={field.value}
                  className={`w-full ${!isEditableDetails ? "border-none focus-visible:ring-0 focus-visible:ring-offset-0" : ""}`}
                  readOnly={!isEditableDetails}
                />
                {!isEditableDetails && (
                  <Pencil
                    type="button"
                    onClick={() => handleEdit("details")}
                    className="h-5 w-5 text-gray-200 hover:text-blue-600 cursor-pointer"
                  />
                )}
              </div>
            </div>
          ))}
          <div className="my-4 w-full">
            {createdStatusHistory.length === 0 ? (
              <div>No history available for status</div>
            ) : (
              createdStatusHistory.map((history) => (
                <div
                  key={history.history_id}
                  className="grid grid-cols-2 gap-4 text-gray-400"
                >
                  <div className="flex items-center space-x-4">
                    <Label className="text-left">Created At:</Label>
                    <div>{formatDate(history.created_at)}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Label className="text-left">Created By:</Label>
                    <div>{history.created_by}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

DetailRetur.propTypes = {
  data: PropTypes.shape({
    retur_no: PropTypes.string,
    customer_name: PropTypes.string,
    country: PropTypes.string,
    products: PropTypes.shape({
      families: PropTypes.shape({
        family_name: PropTypes.string,
      }),
      product_name: PropTypes.string,
    }),
    qty: PropTypes.number,
    serial_no: PropTypes.string,
    issue: PropTypes.string,
  }).isRequired,
  isEditableDetails: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired,
};

export default DetailRetur;
