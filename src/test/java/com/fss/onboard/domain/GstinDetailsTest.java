package com.fss.onboard.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.fss.onboard.web.rest.TestUtil;

public class GstinDetailsTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GstinDetails.class);
        GstinDetails gstinDetails1 = new GstinDetails();
        gstinDetails1.setId(1L);
        GstinDetails gstinDetails2 = new GstinDetails();
        gstinDetails2.setId(gstinDetails1.getId());
        assertThat(gstinDetails1).isEqualTo(gstinDetails2);
        gstinDetails2.setId(2L);
        assertThat(gstinDetails1).isNotEqualTo(gstinDetails2);
        gstinDetails1.setId(null);
        assertThat(gstinDetails1).isNotEqualTo(gstinDetails2);
    }
}
