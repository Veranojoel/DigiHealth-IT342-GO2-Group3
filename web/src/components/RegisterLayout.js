import "./AuthLayout.css";

// --- StepIndicator Component (NEW) ---
const StepIndicator = ({ currentStep, totalSteps, stepTitles }) => {
  return (
    <div className="step-indicator">
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isComplete = stepNum < currentStep;

        return (
          <div
            key={stepNum}
            className={`step ${isActive ? "active" : ""} ${
              isComplete ? "complete" : ""
            }`}
          >
            <div className="circle">{isComplete ? "✓" : stepNum}</div>
            <span className="title">{stepTitles[index]}</span>
            {stepNum < totalSteps && <div className="line"></div>}
          </div>
        );
      })}
    </div>
  );
};

// --- StepLayout Component (MODIFIED) ---
const StepLayout = ({
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel,
  currentStep, // NEW PROP
  totalSteps, // NEW PROP
  stepTitles, // NEW PROP
}) => {
  return (
    <div className="form-card">
      {/* Step Indicator Integration */}
      {totalSteps > 1 && (
        <StepIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={stepTitles}
        />
      )}

      <p className="form-title">{title}</p>
      <p className="form-subtitle">{subtitle}</p>

      <div className="form-inputs">{children}</div>

      <div className="button-container">
        {onBack && (
          <button type="button" className="back-btn" onClick={onBack}>
            Back
          </button>
        )}

        {onNext && (
          <button type="button" className="next-btn" onClick={onNext}>
            {nextLabel || "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

const STEP_TITLES = ["Basic", "Professional", "Availability"];
const TOTAL_STEPS = 3;

// --- RegistrationStep1 Component (MODIFIED for input grouping) ---
export const RegistrationStep1 = ({
  onNext,
  onNavigateToLogin,
  formData,
  setFormData,
}) => {
  return (
    <StepLayout
      title="Basic Information"
      subtitle="Create your doctor account"
      onBack={onNavigateToLogin}
      onNext={onNext}
      currentStep={1}
      totalSteps={TOTAL_STEPS}
      stepTitles={STEP_TITLES}
    >
      <label>Full Name *</label>
      <input
        type="text"
        placeholder="Dr. John Doe"
        value={formData.fullName || ""}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
      />

      <label>Email Address *</label>
      <input
        type="email"
        placeholder="doctor@example.com"
        value={formData.email || ""}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      {/* Input Group for two columns (Password & Confirm Password) */}
      <div className="input-group-half">
        <div className="input-field">
          <label>Password *</label>
          <input
            type="password"
            placeholder="Minimum 8 characters"
            value={formData.password || ""}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <div className="input-field">
          <label>Confirm Password *</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={formData.confirmPassword || ""}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
      </div>
    </StepLayout>
  );
};

// --- RegistrationStep2 Component (Standard) ---
export const RegistrationStep2 = ({
  onNext,
  onBack,
  formData,
  setFormData,
}) => {
  return (
    <StepLayout
      title="Professional Information"
      subtitle="Tell us about your practice"
      onBack={onBack}
      onNext={onNext}
      currentStep={2}
      totalSteps={TOTAL_STEPS}
      stepTitles={STEP_TITLES}
    >
      <label>Specialization *</label>
      <select
        value={formData.specialization || ""}
        onChange={(e) =>
          setFormData({ ...formData, specialization: e.target.value })
        }
      >
        <option value="" disabled>
          Select your specialization
        </option>
        <option value="General Practitioner">General Practitioner</option>
        <option value="Cardiology">Cardiology</option>
        <option value="Dermatology">Dermatology</option>
        <option value="Pediatrics">Pediatrics</option>
        <option value="Neurology">Neurology</option>
      </select>

      <label>Medical License Number *</label>
      <input
        type="text"
        placeholder="MD-12345"
        value={formData.licenseNumber || ""}
        onChange={(e) =>
          setFormData({ ...formData, licenseNumber: e.target.value })
        }
      />

      <label>Phone Number *</label>
      <input
        type="text"
        placeholder="+63"
        value={formData.phoneNumber || ""}
        onChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
      />
    </StepLayout>
  );
};

// --- RegistrationStep3 Component (MODIFIED for state handling of times) ---
export const RegistrationStep3 = ({
  onBack,
  onSubmit,
  formData,
  setFormData,
  isComplete,
  isSubmitting,
}) => {
  // Handles toggling the workday
  const toggleDay = (day) => {
    const days = formData.workDays || [];
    if (days.includes(day)) {
      // Remove day
      setFormData({
        ...formData,
        workDays: days.filter((d) => d !== day),
        availability: { ...formData.availability, [day]: undefined },
      });
    } else {
      // Add day
      setFormData({ ...formData, workDays: [...days, day] });
    }
  };

  // Handles updating start/end times for a specific day
  const handleTimeChange = (day, type, value) => {
    const newAvailability = formData.availability || {};

    // Create/update the day's object with default times if needed
    const dayAvail = newAvailability[day] || {
      startTime: "09:00",
      endTime: "17:00",
    };
    dayAvail[type] = value;

    setFormData({
      ...formData,
      availability: {
        ...newAvailability,
        [day]: dayAvail,
      },
    });
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <StepLayout
      title="Set Your Availability"
      subtitle="Define your working hours"
      onBack={onBack}
      onNext={onSubmit}
      nextLabel={isSubmitting ? "Registering..." : "Complete Registration"}
      currentStep={3}
      totalSteps={TOTAL_STEPS}
      stepTitles={STEP_TITLES}
    >
      <div className="availability-form">
        {daysOfWeek.map((day) => {
          const isWorkingDay = formData.workDays?.includes(day) || false;
          const dayAvailability = formData.availability?.[day] || {};

          return (
            <div key={day} className="day-row">
              <div className="day-label">
                <input
                  type="checkbox"
                  checked={isWorkingDay}
                  onChange={() => toggleDay(day)}
                />
                <label className={isWorkingDay ? "" : "day-off"}>{day}</label>
              </div>

              {isWorkingDay ? (
                <div className="time-inputs">
                  <input
                    type="time"
                    value={dayAvailability.startTime || "09:00"}
                    onChange={(e) =>
                      handleTimeChange(day, "startTime", e.target.value)
                    }
                  />
                  <span>to</span>
                  <input
                    type="time"
                    value={dayAvailability.endTime || "17:00"}
                    onChange={(e) =>
                      handleTimeChange(day, "endTime", e.target.value)
                    }
                  />
                </div>
              ) : (
                <div className="unavailable-text">Day Off</div>
              )}
            </div>
          );
        })}
      </div>
    </StepLayout>
  );
};

export default {
  RegistrationStep1,
  RegistrationStep2,
  RegistrationStep3,
};
