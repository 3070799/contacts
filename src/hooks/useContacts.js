const useSortedContacts = (contacts, sort, direction) => {
    if (sort) {
        if (direction === 'asc') {
            return [...contacts].sort((a, b) => {
                if (a[sort].toString() === b[sort].toString()) {
                    return new Date(b.createdAt) - new Date(a.createdAt)
                }
                if (typeof a[sort] === 'number') {
                    return a[sort] - b[sort];
                }
                return a[sort].toString().localeCompare(b[sort].toString())
            })
        } else if (direction === 'desc') {
            return [...contacts].sort((a, b) => {
                if (a[sort].toString() === b[sort].toString()) {
                    return new Date(a.createdAt) - new Date(b.createdAt)
                }
                if (typeof a[sort] === 'number') {
                    return b[sort] - a[sort];
                }
                return b[sort].toString().localeCompare(a[sort].toString())
            })
        }
    }

    if (direction === 'asc') {
        return contacts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }

    return contacts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
}

export const useContacts = (contacts, sort, query) => {
    const sortedContacts = useSortedContacts(contacts, sort)
    return sortedContacts.filter(contact =>
        contact.firstName.toLowerCase().includes(query.toLowerCase())
        || contact.lastName.toLowerCase().includes(query.toLowerCase())
        || contact.age.toString().includes(query.toLowerCase())
    )
}

export const useContactsAdmin = (contacts, sort, direction, query) => {
    const sortedContacts = useSortedContacts(contacts, sort, direction)
    const filteredContacts = sortedContacts.filter(contact =>
        contact.firstName.toLowerCase().includes(query.toLowerCase())
        || contact.lastName.toLowerCase().includes(query.toLowerCase())
        || contact.age.toString().includes(query.toLowerCase())
        || contact.gender.toLowerCase().includes(query.toLowerCase())
        || contact.country.toLowerCase().includes(query.toLowerCase())
        || contact.city.toLowerCase().includes(query.toLowerCase())
        || contact.phoneNumber.toLowerCase().includes(query.toLowerCase())
    )

    if (query.toLowerCase() === 'male') {
        return filteredContacts.filter(contact =>
            contact.gender.toLowerCase() === 'male'
        )
    }

    return filteredContacts
}