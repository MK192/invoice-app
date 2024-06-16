// components
import { Button } from '../../Button';

type Props = {
    edit: boolean;
    setShowForm: (showForm: boolean) => void;
};

const FormFooter = ({ edit = false, setShowForm }: Props) => {
    return (
        <div>
            {edit ? (
                <div className="flex justify-end gap-2  mt-12 ">
                    <Button
                        text="Cancel"
                        variation="button-3"
                        handleClick={() => setShowForm(false)}
                    />
                    <Button
                        type="submit"
                        text="Save Changes"
                        variation="button-2"
                    />
                </div>
            ) : (
                <div className="flex justify-between mt-12  ">
                    <div>
                        <Button
                            text="Discard"
                            variation="button-3"
                            handleClick={() => setShowForm(false)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            text="Save as Draft"
                            variation="button-4"
                            buttonName="draft"
                        />
                        <Button
                            type="submit"
                            text="Save & Send"
                            variation="button-2"
                            buttonName="pending"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormFooter;
