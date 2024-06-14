

from datetime import date, datetime, time
from mkdocs.config.base import BaseConfigOption, Config, ValidationError
from typing import Dict

# -----------------------------------------------------------------------------
# Classes
# -----------------------------------------------------------------------------

# Date dictionary
class DateDict(Dict[str, datetime]):

    # Initialize date dictionary
    def __init__(self, data: dict):
        super().__init__(data)

        # Ensure presence of `date.created`
        self.created: datetime = data["created"]

    # Allow attribute access
    def __getattr__(self, name: str):
        if name in self:
            return self[name]

# -----------------------------------------------------------------------------

# Post date option
class PostDate(BaseConfigOption[DateDict]):

    # Initialize post dates
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    # Normalize the supported types for post dates to datetime
    def pre_validation(self, config: Config, key_name: str):

        # If the date points to a scalar value, convert it to a dictionary, as
        # we want to allow the author to specify custom and arbitrary dates for
        # posts. Currently, only the `created` date is mandatory, because it's
        # needed to sort posts for views.
        if not isinstance(config[key_name], dict):
            config[key_name] = { "created": config[key_name] }

        # Convert all date values to datetime
        for key, value in config[key_name].items():

            # Handle datetime - since datetime is a subclass of date, we need
            # to check it first, or we lose the time - see https://t.ly/-KG9N
            if isinstance(value, datetime):
                continue

            # Handle date - we set 00:00:00 as the default time, if the author
            # only supplied a date, and convert it to datetime
            if isinstance(value, date):
                config[key_name][key] = datetime.combine(value, time())

        # Initialize date dictionary
        config[key_name] = DateDict(config[key_name])

    # Ensure each date value is of type datetime
    def run_validation(self, value: DateDict):
        for key in value:
            if not isinstance(value[key], datetime):
                raise ValidationError(
                    f"Expected type: {date} or {datetime} "
                    f"but received: {type(value[key])}"
                )

        # Ensure presence of `date.created`
        if not value.created:
            raise ValidationError(
                "Expected 'created' date when using dictionary syntax"
            )

        # Return date dictionary
        return value
