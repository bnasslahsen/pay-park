package com.pay.park.repository;

import com.pay.park.domain.Preference;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Preference entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PreferenceRepository extends JpaRepository<Preference, Long> {

    @Query("select preference from Preference preference where preference.user.login = ?#{principal.username}")
    List<Preference> findByUserIsCurrentUser();

}
